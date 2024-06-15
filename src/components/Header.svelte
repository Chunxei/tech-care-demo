<script lang="ts">
  import homeIcon from "$assets/icons/home.svg";
  import patientsIcon from "$assets/icons/patients.svg";
  import calendarIcon from "$assets/icons/calendar.svg";
  import messageIcon from "$assets/icons/chat-bubble.svg";
  import cardIcon from "$assets/icons/credit-card.svg";
  import settingsIcon from "$assets/icons/settings.svg";
  import moreIcon from "$assets/icons/menu-icon_y-axis.svg";
  import profilePic from "$assets/images/profile-pic.png";
	import ImageMask from "./ImageMask.svelte";
	import { page } from "$app/stores";

$: ({pathname} = $page.url)

const links = [
  { name: "overview", icon: homeIcon },
  { name: "patients", icon: patientsIcon },
  { name: "schedule", icon: calendarIcon },
  { name: "message", icon: messageIcon },
  { name: "transactions", icon: cardIcon },
];

function checkActivePath(path: string, link: string) {
  return path.split("/")[1] === link ? "active" : "";
}
</script>

<header class="Header">
  <a href="/" class="brand">
    <img src="/TestLogo.png" alt="Logo" />
  </a>

  <nav class="nav">
    <ul class="nav-links">
      {#each links as link (link.name)}
      <li>
        <a
          href="/{link.name}"
          class="nav-link"
          class:active={checkActivePath(pathname, link.name)}
          aria-label={link.name}
          title={link.name}
        >
          <img src={link.icon} alt="" />
          <p class="nav-link__label">{link.name}</p>
        </a>
      </li>
      {/each}
    </ul>
  </nav>

  <div class="user-corner">
    <button type="button" class="user-info profile-ctrl">
      <div class="profile-image-wrapper">
        <ImageMask src={profilePic} alt="Profile Picture" absolute />
      </div>
  
      <div class="user-info-text">
        <h5 class="user-name">Dr. Jose Simmons</h5>
        <p class="user-profession">General Practitioner</p>
      </div>
    </button>

    <div class="divider"/>

    <button type="button" class="profile-ctrl">
      <img src={settingsIcon} alt="">
    </button>
  
    <button type="button" class="profile-ctrl">
      <img src={moreIcon} alt="">
    </button>
  </div>
</header>

<style lang="scss">
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  padding: 0.75rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 70px;
}

.brand {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 3rem;
  width: max-content;

  img {
    max-height: 3rem;
  }
}

.nav-links {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  min-width: 55px;
  text-decoration: none;
  padding: 0.7rem 1rem;
  border-radius: 25px;
  /* font-weight: bold; */
  text-transform: capitalize;
  font-size: 0.875rem;


  &.active {
    background: var(--color-primary);
  }
}

.nav-link__label {
  @media screen and (width < 86.875rem) {
    display: none;
  }
}

.user-corner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 0.75rem;
  padding: 0.2rem 0;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 0.5rem;
}

.user-info-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.25rem;
  padding: 0.3rem 0;
}

.user-name {
  font-weight: bold;
}

.user-profession {
  color: var(--color-text-gray);
}

.profile-image-wrapper {
  position: relative;
  height: 100%;
  aspect-ratio: 1;
}

.profile-ctrl {
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;

  &.btn {
    padding: 0;
  }
}

.divider {
  display: block;
  height: 100%;
  width: 1px;
  background: var(--color-divider);
}
</style>