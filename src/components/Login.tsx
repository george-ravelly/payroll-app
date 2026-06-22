
import { useForm } from "react-hook-form"

import { UserLogin, UserLoginSchema } from "../types/dto"
import { zodResolver } from "@hookform/resolvers/zod"

type LoginProps = {
    onLogin: (data: UserLogin) => Promise<void>;
}

export default function Login ({ onLogin }: LoginProps) {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UserLogin>({
        resolver: zodResolver(UserLoginSchema)
    })

    async function formHandleSubmit (data: UserLogin) {
        try {
            await onLogin(data);
        } catch (error) {
            setError("root", {
                message: error instanceof Error ? error.message : "Unable to login",
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(formHandleSubmit)}>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="text" className="input" placeholder="Email" {...register('email')}/>
                        {errors.email && <span>{errors.email.message}</span>}
                        <label className="label">CPF</label>
                        <input type="text" className="input" placeholder="CPF" {...register('cpf')}/>
                        {errors.cpf && <span>{errors.cpf.message}</span>}
                        {errors.root && <span>{errors.root.message}</span>}
                        {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                        <button type="submit" className="btn btn-neutral mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                        </fieldset>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
