document.addEventListener("DOMContentLoaded", function () {
  const username = "12anupa-baral";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".avatar").src = data.avatar_url;
      document.querySelector(".profile h1").innerText = data.name || data.login;
      document.querySelector(".username").innerText =
        data.username || data.login;
      document.querySelector(".about").innerText =
        data.bio || "No bio available";
      document.querySelector(".location p").innerText =
        data.location || "Location not specified";
      document.querySelector(".value1").innerText = data.followers;
      document.querySelector(".value2").innerText = data.following;
    })
    .catch((error) => {
      console.error("Error fetching user information:", error);
      document.querySelector(".error-message").innerText =
        "Failed to fetch user information";
    })
    .finally(() => {
      document.querySelector(".loading").style.display = "none";
    });

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((repos) => {
      const repoList = document.querySelector(".col2");
      repoList.innerHTML = "<h2>Repositories </h2>";

      repos.forEach((repo) => {
        const repoItem = document.createElement("div");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `
            <h3 class="repo_name">${repo.name}</h3>
            <div class="language">
              <h3>Made with: </h3>
              <p>${repo.language || "Not specified"}</p>
            </div>
            <div class="star">
            <div class="rate">
             <i class='fa fa-star'></i>
              <p class="value">: ${repo.stargazers_count}</p>
              </div>
              <div class="link">
              <i class='fa fa-link'></i>
              <a href="${repo.html_url}" target="_blank">view repository</a>
              </div>
            </div>
          `;
        repoList.appendChild(repoItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
      document.querySelector(".error-message").innerText =
        "Failed to fetch repositories";
    });
});
