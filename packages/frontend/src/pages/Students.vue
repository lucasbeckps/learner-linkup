<template>
  <v-sheet class="pa-3 pl-4" style="border-radius: 7px 7px 0 0" elevation="2" border>
    <v-row class="ga-3 mb-4 mb-md-0" no-gutters>
      <v-col cols="12" md="auto" class="ml-1 ml-md-0 d-flex align-self-center">
        <div class="text-h6">Alunos</div>
      </v-col>
      <v-col cols="12" xs="12" md="">
        <v-text-field
          v-model="search"
          variant="plain"
          hide-details
          class="student-search-input rounded border"
          placeholder="Digite sua busca"
        />
      </v-col>
      <v-col cols="12" xs="12" md="auto">
        <v-btn
          @click="openRegisterModal('new')"
          class="add-student-button w-100"
          color="secondary"
          border
          elevation="0"
        >
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
    <div v-else class="rounded">
      <v-table class="d-none d-md-flex">
        <thead>
          <tr>
            <th class="text-left">Registro Acadêmico</th>
            <th class="text-left">Nome</th>
            <th class="text-left">CPF</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Data de cadastro</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in students" :key="item.student_id">
            <td class="ra-column">{{ item.ra }}</td>
            <td class="text-no-wrap" :title="item.name">
              {{ item.name.substring(0, 40) }}{{ item.name.length > 40 ? '...' : '' }}
            </td>
            <td class="cpf-column">{{ item.cpf }}</td>
            <td>{{ item.email }}</td>
            <td class="date-column">
              {{ item.created_at.getDate() }}/{{ item.created_at.getMonth() + 1 }}/{{
                item.created_at.getFullYear()
              }}
              {{ item.created_at.getHours() }}:{{ item.created_at.getMinutes() }}
            </td>
            <td class="text-right text-no-wrap">
              <v-btn
                @click="openRegisterModal(item)"
                class="custom-list-buttom text-blue-grey-darken-1"
                flat
                icon
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="openDeleteDialog(item)"
                class="custom-list-buttom delete-button text-blue-grey-darken-1"
                flat
                icon
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-list class="d-md-none" :items="students" item-props>
        <template v-slot:title="student">
          <v-list-item-title class="d-flex">
            <span class="text-truncate" style="flex: auto" :title="student.item.name"
              >{{ student.item.name }}
            </span>
            <span class="text-grey-lighten-1">
              <v-list-item-action style="height: 25px">
                <v-btn
                  @click="openRegisterModal(student.item)"
                  class="custom-list-buttom text-blue-grey-darken-1"
                  style="font-size: 0.8rem"
                  flat
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="openDeleteDialog(student.item)"
                  class="custom-list-buttom delete-button text-blue-grey-darken-1"
                  style="font-size: 0.8rem"
                  flat
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </span>
          </v-list-item-title>
        </template>
        <template v-slot:subtitle="student">
          <v-row class="text-white">
            <v-col class="pb-0" cols="12" md="4"> RA: {{ student.item.ra }} </v-col>
            <v-col class="pb-0 pt-1" cols="12" md="4">CPF: {{ student.item.cpf }} </v-col>
            <v-col class="pb-0 pt-1" cols="12" md="4">E-mail: {{ student.item.email }} </v-col>
            <v-col class="pb-8 pt-1" cols="12" md="4">
              {{ student.item.created_at.getDate() }}/{{
                student.item.created_at.getMonth() + 1
              }}/{{ student.item.created_at.getFullYear() }}
              {{ student.item.created_at.getHours() }}:{{ student.item.created_at.getMinutes() }}
            </v-col>
          </v-row>
        </template>
      </v-list>
    </div>
  </v-sheet>
  <RegisterModal
    @mounted="({ openModalFn }) => (openRegisterModal = openModalFn)"
    @save="reloadStudents"
  />
  <DeleteDialog
    @mounted="({ openDialogFn }) => (openDeleteDialog = openDialogFn)"
    @delete="reloadStudents"
  />
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import api, { QueryState } from '@frontend/services/api'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'
import { ref, watch } from 'vue'
import { debounce } from 'lodash'

const openRegisterModal = ref(() => {})
const openDeleteDialog = ref(() => {})

const search = ref('')
const queryClient = useQueryClient()

async function fetchStudents(): Promise<StudentResponseDto[]> {
  const { data } = await api.get('students', {
    params: {
      search: search.value
    }
  })
  return data.map((student) => ({
    ...student,
    created_at: new Date(student.created_at)
  }))
}

async function reloadStudents() {
  await queryClient.invalidateQueries({ queryKey: ['students'] })
}

const {
  isPending,
  isError,
  data: students,
  error
}: QueryState<StudentResponseDto[]> = useQuery({
  queryKey: ['students'],
  refetchOnWindowFocus: true,
  queryFn: fetchStudents
})

watch(
  search,
  debounce(() => {
    queryClient.invalidateQueries({ queryKey: ['students'] })
  }, 500)
)
</script>

<style>
.student-search-input input {
  min-height: 1rem;
  height: 2.3rem;
  padding: 0 1rem;
  font-size: 0.9rem;
}

.ra-column {
  min-width: 180px;
  width: 180px;
}

.cpf-column {
  min-width: 130px;
}

.date-column {
  min-width: 150px;
}

.actions-column {
}

.add-student-button {
  border-radius: 5px !important;
  height: 2.4rem !important;
}

.custom-list-buttom {
  width: 40px !important;
  height: 40px !important;
}
.custom-list-buttom.delete-button:hover {
  color: #d50000d3 !important;
}
</style>
