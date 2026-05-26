<script setup lang="ts">
const { team } = defineProps<{
  team: APITeam
}>()

const { data: members } = await useFetch<GetTeamMembersResponse>(
  () => `/api/teams/${team.id}/users`
)
</script>

<template>
  <div>
    <h2 class="bold text-2xl mb-2">{{ team.project.name }}</h2>
    <p class="mb-2">Team: {{ team.name }} ({{ team.id }})</p>
    <p class="mb-2">Pathway: {{ team.pathway }}</p>
    <div v-if="members?.length" class="mb-2">
      <span class="bold">Members: </span>
      <span v-for="(member, i) in members" :key="member.id">
        {{ member.name || member.email }}<template v-if="member.age"> (age {{ member.age }})</template><template v-if="i < members.length - 1">, </template>
      </span>
    </div>
    <pre class="my-4 mx-[2ch] text-wrap">{{ team.project.description }}</pre>
    <div class="flex flex-wrap gap-2">
      <UTooltip :text="team.project.repo_url!">
        <UButton
          variant="subtle"
          icon="i-material-symbols-merge"
          :href="team.project.repo_url!"
          external
          target="_blank"
          >Repo</UButton
        >
      </UTooltip>
      <UTooltip :text="team.project.demo_url!">
        <UButton
          variant="subtle"
          icon="i-material-symbols-play-arrow"
          :href="team.project.demo_url!"
          external
          target="_blank"
          >Demo</UButton
        >
      </UTooltip>
    </div>
  </div>
</template>
