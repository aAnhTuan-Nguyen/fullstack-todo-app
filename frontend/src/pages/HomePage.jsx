import AddTask from "@/components/AddTask"
import DateTimeFilter from "@/components/DateTimeFilter"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import StatsAndFilters from "@/components/StatsAndFilters"
import TaskList from "@/components/TaskList"
import TaskListPagination from "@/components/TaskListPagination"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import api from "@/lib/axios"
import { visibleTasksLimit } from "@/lib/data"
const HomePage = () => {
  // State quản lý tasks và bộ lọc
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [pagination, setPagination] = useState(1)

  useEffect(() => {
    fetchTasks()
  }, [dateFilter]) // Fetch tasks khi dateFilter thay đổi

  useEffect(() => {
    setPagination(1) // Reset về trang 1 khi thay đổi bộ lọc
  }, [filterStatus, dateFilter])

  // Hàm fetch tasks từ backend
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateFilter}`)
      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.activeCount)
      setCompletedTaskCount(res.data.completedCount)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast.error("Lỗi xảy ra khi truy xuất tasks")
    }
  }

  // == Lọc tasks dựa trên trạng thái ==
  const filteredTasks = taskBuffer.filter((task) => {
    if (filterStatus === "active") return task.status === "active"
    if (filterStatus === "complete") return task.status === "complete"
    return true
  })

  // logic phân trang
  const visibleTasks = filteredTasks.slice(
    (pagination - 1) * visibleTasksLimit,
    pagination * visibleTasksLimit
  )

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksLimit)

  const handleNextPage = () => {
    if (pagination < totalPages) setPagination((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (pagination > 1) setPagination((prev) => prev - 1)
  }

  const handleChangePage = (page) => {
    setPagination(page)
  }

  // Nếu trang hiện tại không còn tasks nào, tự động lùi về trang trước
  if (visibleTasks.length === 0) {
    handlePrevPage()
  }

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo Nhiệm Vụ */}
          <AddTask handleNewTaskAdded={fetchTasks} />

          {/* Thống Kê và Bộ lọc */}
          <StatsAndFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />

          {/* Danh Sách Nhiệm Vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filterStatus}
            handleChange={fetchTasks}
          />

          {/* Phân Trang và Lọc Theo Date */}
          <div className="flex flex-row items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              currentPage={pagination}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onChangePage={handleChangePage}
            />
            <DateTimeFilter
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>

          {/* Chân Trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
