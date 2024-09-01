import { GoDotFill } from 'react-icons/go'

import { cn } from '@/lib/utils'

export function IsBusy({ nbPendingTasks = 0 }: { nbPendingTasks?: number }) {
  return (
    <GoDotFill
      className={cn(
        `-mt-[9px] ml-[1px] -mr-1.5 h-1.5 w-1.5 text-yellow-400`,
        nbPendingTasks > 0 ? 'animate-pulse opacity-100' : 'opacity-0'
      )}
    />
  )
}
