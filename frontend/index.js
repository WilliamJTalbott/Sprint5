async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.



async function fetchLearnerData() {
    
    try {

      const learners = await axios.get('http://localhost:3003/api/learners')
      console.log(learners.data)
      return learners.data

    }

    catch (error){

      console.error('Error fetching data:', error)

    }

  }

  async function fetchMentorsData() {
    
    try {

      const mentors = await axios.get('http://localhost:3003/api/mentors')
      console.log(mentors.data)
      return mentors.data

    }

    catch (error){

      console.error('Error fetching data:', error)

    }

  }

  let learners = await fetchLearnerData()
  let mentors = await fetchMentorsData()

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  //Learners is an object
  //Spliced Learners into learner with forEach
  //Grab Mentor Ids
  //Search Mentors for the Ids
  //Return the names into string
  //Set string as mentors

  learners.forEach((learner) => { 

    let mentorArr = []

      for (let i = 0; i < learner.mentors.length; i++)
      {let mentor = mentors.find(user => user.id === learner.mentors[i])
        mentorArr.push(`${mentor.firstName} ${mentor.lastName}`)
      }
      learner.mentors = mentorArr
   })
  console.log(learners)


  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const cardsDiv = document.querySelector('.cards');

    // Create the card container
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Create and append the heading
    const heading = document.createElement('h3');
    heading.textContent = `${learner.fullName}, ID ${learner.id}`;
    card.appendChild(heading);
    
    // Create and append the email div
    const email = document.createElement('div');
    email.textContent = learner.email;
    card.appendChild(email);
    
    // Create and append the mentors heading
    const mentorsHeading = document.createElement('h4');
    mentorsHeading.classList.add('closed');
    mentorsHeading.textContent = 'Mentors'; // Add text to the mentors heading
    card.appendChild(mentorsHeading);
    
    // Create the mentors list
    const mentorsList = document.createElement('ul');
    
    // Iterate through the mentors array and create list items
    for (let i = 0; i < learner.mentors.length; i++) {
      const mentorItem = document.createElement('li'); // Use 'li' for list items
      mentorItem.textContent = learner.mentors[i];
      mentorsList.appendChild(mentorItem); // Append each list item to the ul
    }
    
    // Append the mentors list to the card
    card.appendChild(mentorsList);
    
    // Append the card to the target div
    cardsDiv.appendChild(card);

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
