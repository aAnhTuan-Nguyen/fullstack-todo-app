import React from "react"
import { Badge } from "./ui/badge"
import { FilterType } from "@/lib/data"
import { Button } from "./ui/button"
import { Filter } from "lucide-react"

const StatsAndFilters = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/40"
        >
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-green-500/20 text-green-700 border-green-500/40"
        >
          {completedTaskCount} {FilterType.complete}
        </Badge>
      </div>

      {/* Phần fillter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((type) => {
          return (
            <Button
              key={type}
              variant={filterStatus === type ? "gradient" : "ghost"}
              size="sm"
              className="capitalize"
              onClick={() => setFilterStatus(type)}
            >
              <Filter className="size-4" />
              {FilterType[type]}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default StatsAndFilters
