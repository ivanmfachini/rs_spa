import {routes} from './routes.js';

async function route(event){
    event = event || window.event;
    event.preventDefault();
    let which_route = event.target.href || event.target.value;
    window.history.pushState({},"",which_route);
    const previous = document.getElementsByClassName("current")[0].id;
    await handle(previous)
};

async function handle(in_previous = false){
    const {pathname} = window.location;
    const route = routes[pathname] || routes[404];
    const fetch_response = await fetch(route, { method: 'GET' });
    const html_data = await fetch_response.text();
    document.querySelector("#app").innerHTML = html_data;
    try{
        document.querySelector("body").style['background'] = `url("../assets/images/bg_${pathname.slice(1,)}.png") black 50% / cover no-repeat`;
        document.getElementById(`nav_${pathname.slice(1,)}`).classList.toggle("current")
    } catch{
        document.querySelector("body").style['background'] = 'url("../assets/images/bg_.png") black 50% / cover no-repeat';
        document.getElementById('nav_').classList.toggle("current")
    };
    if(in_previous){
        document.getElementById(`${in_previous}`).classList.toggle("current")
    }
};
handle();

window.onpopstate = () => {
    const previous = document.getElementsByClassName("current")[0].id;
    handle(previous);
};
window.route = () => route();