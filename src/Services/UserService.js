import axios from "axios";

const API_URL = "https://lit-taiga-43062.herokuapp.com/";


const Register = (name, email, gender, password) => {
    return axios
        .post(API_URL + "register", {
            name,
            email,
            gender,
            password,
        },
            {
                headers: { "Access-Control-Allow-Origin": "*" }
            }
        )
        .then((response) => {
            console.log(Response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export default { Register };