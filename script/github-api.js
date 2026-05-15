export async function getUser(username) {
  const user = await fetch(`https://api.github.com/users/${username}`);
  if (!user.ok) throw new Error("Erro ao procurar usuário");
  return user.json();
}

export async function getRepos(username, page) {
  const repos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&page=${page}`,
  );
  if (!repos.ok) throw new Error("Erro ao procurar repositórios");
  return repos.json();
}
