<template>
  <v-dialog v-model="dialogOpen" max-width="500">
    <v-card title="Confirmar remoção">
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
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto'
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto'
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto'
import api from '@frontend/services/api'

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
  await api.delete(`students/${studentEntity.value.student_id}`)
  closeDialog()
}

const emit = defineEmits(['mounted'])

onMounted(() => {
  emit('mounted', { openDialogFn: openDialog })
})
</script>
