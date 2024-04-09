<template>
  <v-sheet class="pa-2 pl-4" style="border-radius: 7px 7px 0 0" elevation="2" border>
    <v-row no-gutters>
      <v-col cols="auto" class="mr-4">
        <div class="text-h6">Alunos</div>
      </v-col>
      <!--      <v-col>-->
      <!--        <v-btn border elevation="1" style="border-radius: 7px;">-->
      <!--          Adicionar aluno-->
      <!--        </v-btn>-->
      <!--      </v-col>-->
    </v-row>
  </v-sheet>
  <v-sheet style="border-radius: 0 0 7px 7px" elevation="2" border>
    <div v-if="isPending">Carregando...</div>
    <div v-else-if="isError">{{ error.message }}</div>
    <v-table v-else>
      <thead>
        <tr>
          <th class="text-left">Registro Acadêmico</th>
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
