<template>
  <v-table class="d-none d-md-flex students-table">
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
</template>

<script setup lang="ts">
defineProps(['students', 'openRegisterModal', 'openDeleteDialog'])
</script>

<style lang="scss">
.students-table {
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
}
</style>
