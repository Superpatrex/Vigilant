const app_name = "cop4331-vigilant";

function buildPath(route)
{
    return "https://" + app_name + ".herokuapp.com/" + route;
}

export default buildPath;