const nav = `
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.html">
        Quiz<span>Master</span>
      </a>

      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li>
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li>
            <a class="nav-link" href="dashboard.html">Dashboard</a>
          </li>
          <li>
            <a class="nav-link" href="quiz.html">Quiz</a>
          </li>
          <li>
            <a class="nav-link" href="leaderboard.html">Leaderboard</a>
          </li>
          <li>
            <a class="nav-link" href="profile.html">Profile</a>
          </li>
          <li>
            <a class="nav-link" href="about.html">About</a>
          </li>
          <li>
            <a class="btn btn-primary btn-sm ms-lg-3" href="login.html">
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.getElementById("nav");

  if (navigation) {
    navigation.innerHTML = nav;
  }

  const username = localStorage.getItem("quizUser");

  if (username) {
    const userNameElement = document.getElementById("userName");
    const profileNameElement = document.getElementById("profileName");

    if (userNameElement) {
      userNameElement.textContent = username;
    }

    if (profileNameElement) {
      profileNameElement.textContent = username;
    }
  }
});
