export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-11'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skqR0uttQJaFdTsSaj0F6qNFQKt6UA95eJguAZzXPINSvj9nvmaVfoy98c7LL3extvnnwTMqJMxrpcXJvPLvNUJqn03XuupDLtU9L9Ruvr0yNMjqGNIVyv5gw9uO9NuQ7CeyYHTa9ZHaHPIijBxRBCLAnTNLq55MwJKm7XShMtI9RHgR6caE",
  'Missing environment variable: NEXT_SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
