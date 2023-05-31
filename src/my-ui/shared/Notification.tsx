import { useNotificationStore } from "@/state/zustand/store";
import { X } from "lucide-react";

interface NotificationProps {}

export const Notification = ({}: NotificationProps) => {
  const store = useNotificationStore();
  const notification = store.localValues?.notifocation;

  if (!store.localValues.hasNotification) {
    return null;
  }

  return (
    <div className="h-full  w-[40%] ">
      <div
        className="flex  w-full  flex-col items-center justify-center 
        animate-in fade-in slide-in-from-right ">
        {notification?.type === "success" ? (
          <div
            className=" line-clamp-3 w-[90%] rounded-xl border-2 border-accent-foreground bg-secondary
                         p-2 text-secondary-foreground 
                       
                         "
          >
            {notification.message}
          </div>
        ) : null}
        {notification?.type === "error" ? (
          <div
            className="flex w-[90%]  items-center justify-center
                rounded-xl border-2 border-red-800 bg-red-100  text-red-900 
                "
          >
            <div className=" line-clamp-4 w-full p-2 ">
              {notification.message}
            </div>
            <div className="h-full p-3 text-white">
              <X
                className="h-4 w-4"
                onClick={() => store.clearNotification()}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
