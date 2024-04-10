<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="modalOpen" v-if="studentEntity" max-width="600">
      <v-card
        class="rounded-lg"
        prepend-icon="mdi-account"
        :title="
          studentEntity.student_id
            ? `Editando ${studentEntity?.name}`
            : studentEntity.name
              ? `Adicionando ${studentEntity.name}`
              : 'Adicionar aluno'
        "
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                label="Registro Acadêmico"
                v-model="studentEntity.ra"
                :disabled="!!studentEntity.student_id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" sm="12">
              <v-text-field
                label="CPF"
                v-model="studentEntity.cpf"
                :disabled="!!studentEntity.student_id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="12">
              <v-text-field label="Nome" v-model="studentEntity.name" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="12">
              <v-text-field label="E-mail" v-model="studentEntity.email" required></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*campos obrigatórios</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancelar" variant="plain" @click="closeModal"></v-btn>
          <v-btn color="primary" text="Salvar" variant="tonal" @click="save"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto'
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'
import api from '@frontend/services/api'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const emit = defineEmits(['mounted', 'save', 'cancel'])

const modalOpen = ref(false)
const studentEntity = ref<StudentRegisterDto | StudentEditDto>(null)

function openModal(requestedStudent: StudentResponseDto | 'new') {
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
    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((message: string) => $toast.error(message))
    } else {
      $toast.error('Erro ao salvar aluno')
    }
  }
}

onMounted(() => {
  emit('mounted', { openModalFn: openModal })
})
</script>
