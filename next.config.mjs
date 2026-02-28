/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""
const useRepoBasePath = process.env.PAGES_USE_REPO_BASEPATH !== "false"
const basePath = isGithubActions && repoName && useRepoBasePath ? `/${repoName}` : ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: basePath ? `${basePath}/` : undefined,
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
