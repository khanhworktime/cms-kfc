import React, {useReducer} from 'react';
import {Button, TextField} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";
import env from "../../env";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigator = useNavigate()

    const [input, updateInput] = useReducer((state:any, newState:any) => ({ ...state, ...newState }),
        {
            email: "",
            password: ""
        }
    )

    const signInHandler = () => {
        const loginFn = axios({
            method: "post",
            data: {...input},
            url: env.serverUrl + "/login"
        })

        toast.promise(loginFn, {
            pending: 'Logging in',
            success: 'Success',
            error: {
                render({data}) {
                    // @ts-ignore
                    return data.response.data.message ? data.response.data.message : "Unknown error, contact for some help!";
                }
            }
        }).then((res)=>{
            if (res.data.success) {
                localStorage.setItem("uid", res.data.uid)
                navigator('/');
            }
        })
    }

    return (
        <div>
            <section className="bg-gray-200 transition-all">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-3xl font-bold text-blue-500">
                            KFC CMS
                    </div>
                    <div
                        className="w-full bg-white rounded-lg shadow max-w-[500px]">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <TextField type="email" name="email" id="email" label={"Your email"}
                                           className="bg-gray-50 border border-gray-300 text-white rounded-lg w-full p-2.5"
                                           placeholder="name@company.com" required
                                            onChange={(e)=>updateInput({email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <TextField type="password" name="password" id="password" label={"Your password"}
                                           className="bg-gray-50 border border-gray-300 text-white rounded-lg w-full p-2.5"
                                           required
                                           onChange={(e)=>updateInput({password: e.target.value})}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="#"
                                       className="text-sm font-medium text-primary-600">Forgot
                                        password?</a>
                                </div>
                                <Button variant={"contained"} onClick={signInHandler}
                                        className="w-full text-white bg-primary-600">
                                    Sign in
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;