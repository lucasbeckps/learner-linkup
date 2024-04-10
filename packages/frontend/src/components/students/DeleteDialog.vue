<template>
  <v-dialog v-model="dialogOpen" max-width="500">
    <v-card class="rounded-lg" title="Confirmar remoção">
      <v-card-text>
        <v-row>
          <v-col>
            <p>
              Tem certeza que deseja remover <strong> {{ studentEntity.name }}</strong
              >?
              <br />
              <small class="text-caption text-medium-emphasis">Essa ação é irreversível.</small>
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancelar</v-btn>
        <v-btn color="error" text @click="doDelete"><strong>Remover</strong></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'
import api from '@frontend/services/api'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const emit = defineEmits(['mounted', 'delete'])

const dialogOpen = ref(false)
const studentEntity = ref<StudentEditDto>(null)

function openDialog(requestedStudent: StudentResponseDto) {
  dialogOpen.value = true
  studentEntity.value = new StudentEditDto(requestedStudent)
}

function closeDialog() {
  dialogOpen.value = false
}

async function doDelete() {
  try {
    await api.delete(`students/${studentEntity.value.student_id}`)
    $toast.success('Aluno removido com sucesso!')
    emit('delete', studentEntity.value)
    closeDialog()
  } catch (err) {
    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((message: string) => $toast.error(message))
    } else {
      $toast.error('Erro ao remover aluno')
    }
  }
}

onMounted(() => {
  emit('mounted', { openDialogFn: openDialog })
})
</script>
