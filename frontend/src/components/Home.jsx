import { useNavigate } from 'react-router'
import { Feather } from 'lucide-react'

function Home() {

  const navigate=useNavigate();

  const onRegister=()=>{
    navigate("/register")
  }

  const onLogin=()=>{
    navigate("/login")
  }
  return (
    <div>
      <div className='text-center mb-30'>
        <div className="flex mt-30 mb-8 justify-center items-center gap-2">
          <Feather className="w-14 h-14" />
          <h1 className="text-6xl font-bold">Taskify</h1>
        </div>
        <p>Plan smarter, work faster, and manage tasks effortlessly.</p>
      </div>
      

      <div className='flex justify-center items-center mb-30'>
        <div className='grid grid-cols-5 grid-rows-2 w-[900px] h-[500px] gap-8'>
          <div className='col-span-3 row-span-1 rounded-4xl shadow-xl p-8'>
            <h2 className="text-2xl font-bold mb-4">Smart Task Management</h2>
            <p>
              Create, organize, and prioritize tasks with ease. Manage deadlines,
              assign responsibilities, and keep every project structured in one place.
            </p>  
          </div>
          <div className='col-span-2 row-span-1 rounded-4xl shadow-xl p-8'>
            <h2 className="text-2xl font-bold mb-4">Team Collaboration</h2>
            <p>
              Work seamlessly with teammates through shared boards, task updates,
              and real-time collaboration that keeps everyone aligned.
            </p>
          </div>
          <div className='col-span-2 row-span-1 rounded-4xl shadow-xl p-8'>
            <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
            <p>
              Monitor project stages, track completed tasks, and stay informed
              with clear workflow visibility from start to finish.
            </p>
          </div>
          <div className='col-span-3 row-span-1 rounded-4xl shadow-xl p-8'>
            <h2 className="text-2xl font-bold mb-4">Boost Productivity</h2>
            <p>
              Simplify complex workflows, reduce clutter, and focus on what matters
              most with an efficient system built for individuals and teams.
            </p>
          </div>
        </div>
      </div>

      <div className='text-center mb-25'>
        <h3 className="text-4xl font-bold mb-4">Start organizing your work today</h3>
        <p>Join Taskify to manage tasks, collaborate with your team,and turn ideas into completed projects.</p>
      </div>

      <div className='flex justify-center items-center gap-10 mb-50'>
        <button onClick={onRegister} className='rounded-4xl shadow-xl border p-5'>Register</button>
        <button onClick={onLogin} className='rounded-4xl shadow-xl border p-5'>Login</button>
      </div>
    </div>
  )
}

export default Home