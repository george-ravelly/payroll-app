import { Attendance, AttendanceStatus, schedulerSchema } from "@/types/employee"
import { getSchedulerClockInOut } from "../utils/request"
import { getEmployeeAttendanceStatus } from "../utils/utils"
import { useQuery } from "@tanstack/react-query"
import { ForwardedRef, forwardRef, memo } from "react"
import z from "zod"
import Spinner from "./Spinner"

type ClockInOut = {
    employeeId: string
}

type Ref = ForwardedRef<HTMLDialogElement>

const ClockInOutModal = memo(forwardRef<HTMLDialogElement, ClockInOut>((props, ref: Ref) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['employees-schedule', props.employeeId],
        queryFn: () => getSchedulerClockInOut(props.employeeId)
    })
    
    function isEmployeeLate(schedule: z.infer<typeof schedulerSchema>, attendance?: Attendance) {        
        return getEmployeeAttendanceStatus(schedule, attendance || {})
    }

    function getButtonColorBaseOnStatus (status: AttendanceStatus) {
        if (status === 'LATE') {
            return 'warning'
        } else if (status === 'FINISHED') {
            return 'accent'
        } else if (status === 'NOT_STARTED') {
            return 'primary'
        } else if (status === 'LEFT_EARLY') {
            return 'warning'
        }
    }

    return (
        <dialog className="modal" id="clockinout" ref={ref}>
            {isPending ? <><Spinner /></> : <>{typeof data}</>}
            {data ? (
                <div className="modal-box">
                    <h1>{`Olá, ${data.name}`}</h1>
                    <strong>Position: </strong><span>{data.position}</span><br />
                    <strong>Status:</strong> {isEmployeeLate(data.schedules)}
                    <p>
                        <strong>To clock in: </strong><span>{data.schedules.clockIn}</span><br />
                        <strong>To clock out: </strong><span>{data.schedules.clockOut}</span>
                    </p>
                    <div className="modal-action">
                        <button className={`btn btn-active btn-${getButtonColorBaseOnStatus(isEmployeeLate(data.schedules))}`}>ClockIn</button>
                        <form method="dialog">
                            <button className="btn btn-active btn-neutral">Close</button>
                        </form>
                    </div>
                </div>
            ) : <></>}
        </dialog>
    )
}))


export default ClockInOutModal;