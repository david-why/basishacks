<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
useHead({
  title: `Admin | ${WEBSITE_NAME}`,
})

const { user: userRef } = useUserSession()
const userID = computed(() => userRef.value?.id ?? 0)

const { data: userData, error: userError } = await useFetch<GetUserResponse>(
  () => `/api/users/${userID.value}`,
)
if (userError.value) {
  throw userError.value
}
if (userData.value?.role !== 'admin') {
  throw await navigateTo('/')
}

const { data, error } = await useFetch<APITeam[]>('/api/teams?submitted=1')
if (error.value) {
  throw error.value
}
</script>

<template>
  <div>
    <h1 class="text-4xl text-primary bold glow mb-4">Admin: Submitted Projects</h1>
    <p v-if="!data">Loading projects...</p>
    <div v-else>
      <p class="mb-4">{{ data.length }} submitted project{{ data.length === 1 ? '' : 's' }}.</p>
      <UCard
        v-for="team in data"
        :key="team.id"
        variant="subtle"
        class="mb-4"
      >
        <ProjectDetails :team="team" />
      </UCard>
      <p v-if="!data.length">No projects have been submitted yet.</p>
    </div>
  </div>
</template>
