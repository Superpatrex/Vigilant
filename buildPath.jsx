const app_name = "cop4331-vigilant";

function buildPath(route)
{
    // return "https://" + app_name + ".herokuapp.com/" + route;
    return 'http://localhost:4091/' + route;
}

export default buildPath;