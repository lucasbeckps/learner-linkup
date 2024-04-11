<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="modalOpen" v-if="studentEntity" max-width="600">
      <v-card
        class="rounded-lg"
        prepend-icon="mdi-account"
        :title="
          studentEntity.student_id
            ? `Editando ${studentEntity?.name}`
            : studentEntity.name?.length > 2
              ? `Adicionando ${studentEntity.name}`
              : 'Adicionar aluno'
        "
      >
        <v-form v-model="isFormValid">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="5" sm="12">
                <v-text-field
                  label="Registro Acadêmico*"
                  v-model="studentEntity.ra"
                  :rules="raRules"
                  :disabled="!!studentEntity.student_id"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="7" sm="12">
                <v-text-field
                  label="CPF*"
                  v-model="studentEntity.cpf"
                  v-maska:[cpfMaskOptions]
                  :rules="cpfRules"
                  :disabled="!!studentEntity.student_id"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  label="Nome*"
                  v-model="studentEntity.name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  label="E-mail*"
                  v-model="studentEntity.email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >Todos os campos são obrigatórios</small
            >
          </v-card-text>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancelar" variant="plain" @click="closeModal"></v-btn>
          <v-btn
            class="save-button"
            color="primary"
            variant="tonal"
            @click="save"
            :disabled="!isFormValid"
          >
            <v-icon v-if="isLoading" class="mdi-spin">mdi-loading</v-icon>
            <template v-else>Salvar</template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { vMaska } from 'maska'
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto'
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'
import api from '@frontend/services/api'
import { useToast } from 'vue-toast-notification'
import {
  fieldIsCpf,
  fieldIsEmail,
  fieldMaxLength,
  fieldMinLength,
  fieldRequired
} from '@frontend/utils/formValidation'
import { isAuthTokenValid } from '@frontend/utils/auth'

const $toast = useToast()

// Form validation
const isFormValid = ref(false)
const cpfMaskOptions = { mask: '###.###.###-##' }
const raRules = [fieldRequired('RA'), fieldMaxLength('Registro Acadêmico', 20)]
const cpfRules = [fieldRequired('CPF'), fieldIsCpf('CPF')]
const nameRules = [fieldRequired('Nome'), fieldMinLength('Nome', 3), fieldMaxLength('Nome', 80)]
const emailRules = [fieldRequired('E-mail'), fieldMaxLength('E-mail', 80), fieldIsEmail('E-mail')]

// Modal state
const emit = defineEmits(['mounted', 'save', 'cancel'])
const modalOpen = ref(false)
const isLoading = ref(false)
const studentEntity = ref<StudentRegisterDto | StudentEditDto>(null)

function openModal(requestedStudent: StudentResponseDto | 'new') {
  if (!isAuthTokenValid()) location.reload()

  modalOpen.value = true
  studentEntity.value =
    typeof requestedStudent === 'object'
      ? new StudentEditDto(requestedStudent)
      : new StudentRegisterDto({
          ra: '',
          cpf: '',
          name: '',
          email: ''
        })
}

function closeModal() {
  studentEntity.value && emit('cancel')
  modalOpen.value = false
}

async function save() {
  try {
    isLoading.value = true
    if (studentEntity.value.student_id) {
      await api.put(`students/${studentEntity.value.student_id}`, studentEntity.value)
    } else {
      await api.post('students', studentEntity.value)
    }

    $toast.success('Aluno salvo com sucesso!')
    emit('save', studentEntity.value)
    studentEntity.value = null
    closeModal()
  } catch (err) {
    if (err.response?.status === 401) location.reload()
    else if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((message: string) => $toast.error(message))
    } else {
      $toast.error('Erro ao salvar aluno')
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  emit('mounted', { openModalFn: openModal })
})
</script>

<style>
.save-button {
  width: 100px;
}
</style>
