/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           
*/
const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/taniamichelle')
  .then(res => {
    console.log('response: ', res.data);
    const card = createCard(res.data);
    cards.append(card);
    //alternatively: cards.append(createCard(res, data));
  })
  .catch(error => {
    console.log('error found: ', error);
  })

axios.get("https://api.github.com/users/taniamichelle/followers")
  .then(res => res.data.slice(0, 3))
  .then(followers => {
    followers.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower.login}`)
        .then(res => {
          const card = createCard(res.data);
          cards.append(card);
        });
    });
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const followersArray = [];
const instructors = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell",
];

instructors.forEach(instructor => {
  axios.get(`https://api.github.com/users/${instructor}`)
    .then(res => {
      const card = createCard(res.data);
      cards.append(card);
    });
});



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function createCard(user) {
  const card = document.createElement('div');
  card.classList.add('card');

  const avatar = document.createElement('img');
  avatar.src = user.avatar_url;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = user.name;

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = user.login;

  const location = document.createElement('p');
  location.textContent = `Location: ${user.location || "none"}`;

  const profile = document.createElement('p');
  profile.textContent = 'Profile';

  const link = document.createElement('a');
  link.href = user.html_url;
  link.textContent = user.html_url;

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${user.followers || "none"}`;

  const following = document.createElement('p');
  following.textContent = `Following: ${user.following || "none"}`;

  const bio = document.createElement('p');
  //the or none ensures that empty bios will show bio: none rather than bio: null
  bio.textContent = `Bio: ${user.bio || "none"}`;
  //Alternatively, you can do it like this so bio will not show up at all if empty: bio.textContent = user.bio;

  card.append(avatar);
  card.append(cardInfo);
  cardInfo.append(
    name,
    username,
    location,
    profile,
    followers,
    following,
    bio
  );
  profile.append(link);

  return card;
}
