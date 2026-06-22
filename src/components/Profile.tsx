import { Employee } from "@/types/employee";
import { forwardRef } from "react";

type Prop = {
    employee: Employee
}

const Profile = forwardRef<HTMLDialogElement, Prop>(({employee}, ref) => {
    return <>
        <dialog 
            id="profile-modal"
            ref={ref} 
            className="modal"
        >
            {employee ? 
            <div className="modal-box">
                <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">
                    Funcionario
                    </h2>
    
                    <div className="divider" />
    
                    <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p>
                            <strong>Nome:</strong> {employee.name}
                        </p>
                        <p>
                        <strong>Matrícula:</strong> {employee.id}
                        </p>
                    </div>
    
                    <div>
                        <p>
                            <strong>Cargo:</strong> {employee.position}
                        </p>
                        <p>
                            <strong>Departamento:</strong> {employee.departmentName}
                        </p>
                    </div>
                    </div>
    
                    <div className="divider" />
                </div>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </div> : <></>}
        </dialog>
    </>
});

export default Profile;