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
          placeholder="Busque por nome, registro acadêmico, CPF ou e-mail"
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
    <div v-if="isFetching">
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader type="table-tbody" class="mb-2" style="transform: scaleY(-1)" />
    </div>
    <Error v-else-if="error" />
    <template v-else-if="students.length">
      <Table :students :open-register-modal :open-delete-dialog />
      <MobileList :students :open-register-modal :open-delete-dialog />
    </template>
    <EmptyState v-else :open-register-modal :last-loaded-search />
  </v-sheet>
  <v-pagination v-if="totalPages" :length="totalPages" v-model="page" class="mt-4" />
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
import { isAuthTokenValid } from '@frontend/utils/auth'

const openRegisterModal = ref(() => {})
const openDeleteDialog = ref(() => {})

const search = ref('')
const lastLoadedSearch = ref('')
const queryClient = useQueryClient()
const totalPages = ref(null)
const page = ref(1)

async function fetchStudents(): Promise<StudentResponseDto[]> {
  if (!isAuthTokenValid()) location.reload()

  const searchCopy = `${search.value}`
  const { data } = await api.get('students', {
    params: {
      search: search.value,
      page: page.value
    }
  })
  lastLoadedSearch.value = searchCopy

  totalPages.value = data.totalPages
  return data.students.map((student) => ({
    ...student,
    created_at: new Date(student.created_at)
  }))
}

async function reloadStudents() {
  await queryClient.invalidateQueries({ queryKey: ['students'] })
}

const {
  isFetching,
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
    reloadStudents()
  }, 500)
)

watch(page, () => {
  reloadStudents()
})
</script>

<style lang="scss">
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
