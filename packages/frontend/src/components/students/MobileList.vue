<template>
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
      <v-row>
        <v-col class="pb-0" cols="12" md="4"> RA: {{ student.item.ra }} </v-col>
        <v-col class="pb-0 pt-1" cols="12" md="4">CPF: {{ student.item.cpf }} </v-col>
        <v-col class="pb-0 pt-1" cols="12" md="4">E-mail: {{ student.item.email }} </v-col>
        <v-col class="pb-8 pt-1" cols="12" md="4">
          {{ student.item.created_at.getDate() }}/{{ student.item.created_at.getMonth() + 1 }}/{{
            student.item.created_at.getFullYear()
          }}
          {{ student.item.created_at.getHours() }}:{{ student.item.created_at.getMinutes() }}
        </v-col>
      </v-row>
    </template>
  </v-list>
</template>

<script setup lang="ts">
defineProps(['students', 'openRegisterModal', 'openDeleteDialog'])
</script>

<style lang="scss">
.custom-list-buttom {
  width: 40px !important;
  height: 40px !important;

  &.delete-button:hover {
    color: #d50000d3 !important;
  }
}
</style>
