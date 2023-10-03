const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events';

const state = {
    events: []
}

const eventsList = document.querySelector('#events')
const addEventForm = document.querySelector('#addEvent');
addEventForm.addEventListener("submit", addEvent);

//sync state with api and rerender
async function render() {
    await getEvents();
    renderEventsDOM();
}

render();

// a function to fetch the list of recipes
async function getEvents() {
    try {
        const res = await fetch(API_URL);
        const json = await res.json();
        state.events = json.data;
    } catch (error) {
        console.log(error);
    }
}

function renderEventsDOM() {
    const events = state.events.map(event => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3 class="item">${event.name}</h3>
        <p class="item">${event.date}</p>
        <p class="item">${event.location}</p>
        <p class="item">${event.description}</p>
        `;
        const button = document.createElement('button');
        button.className = 'remove-btn';
        button.innerHTML = `<i class="remove-icon></i>`;
        li.appendChild(button);
        return li;
    })
    eventsList.replaceChildren(...events);
}


async function addEvent(event) {
    event.preventDefault();

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: event.target.name.value,
                date: event.target.date.value,
                location: event.target.location.value,
                description: event.target.description.value
            }),
        })
        
        if (!response.ok) {
            throw new Error("Failed to create event");
        }

        render();
    } catch (error) {
        console.error(error);
    }
}



