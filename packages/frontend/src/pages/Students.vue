<template>
  <v-sheet class="pa-3 pl-4" style="border-radius: 7px 7px 0 0" elevation="2" border>
    <v-row no-gutters>
      <v-col cols="auto" class="mr-4 d-flex align-self-center justify-center">
        <div class="text-h6">Alunos</div>
      </v-col>
      <v-col class="d-flex align-self-center justify-center">
        <v-text-field
          variant="plain"
          hide-details
          class="student-search-input rounded border mr-4"
          placeholder="Digite sua busca"
        />
      </v-col>
      <v-col cols="auto" class="d-flex align-self-center justify-center">
        <v-btn class="add-student-button" color="secondary" border elevation="0">
          Adicionar aluno
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <v-sheet style="border-radius: 0 0 7px 7px" elevation="2" border>
    <div v-if="isPending">
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader type="table-tbody" class="mb-2" style="transform: scaleY(-1)" />
    </div>
    <div v-else-if="isError">{{ error.message }}</div>
    <v-table v-else>
      <thead>
        <tr>
          <th class="ra-column text-left">Registro Acadêmico</th>
          <th class="text-left">Nome</th>
          <th class="text-left">CPF</th>
          <th class="text-left">E-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in students" :key="item.student_id">
          <td>{{ item.ra }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.cpf }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api, { QueryState } from '@frontend/services/api'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'

const fetchStudents = async (): Promise<StudentResponseDto[]> => {
  const { data } = await api.get('students')
  return data
}

const {
  isPending,
  isError,
  data: students,
  error
}: QueryState<StudentResponseDto[]> = useQuery({
  queryKey: ['students'],
  queryFn: fetchStudents
})
</script>

<style>
.student-search-input input {
  min-height: 1rem;
  height: 2.3rem;
  padding: 0 1rem;
  font-size: 0.9rem;
}

.add-student-button {
  border-radius: 5px !important;
  height: 2.4rem !important;
}
</style>
