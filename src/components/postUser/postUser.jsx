import Image from "next/image";
import { getUser } from "@/library/data";
import { User, Crown, Mail } from "lucide-react";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);

  return (
    <div className="group relative">
      {/* Main Author Card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-4">
          {/* Avatar with Fallback */}
          <div className="relative flex-shrink-0">
            {user.img ? (
              <Image
                src={user.img}
                alt={`${user.username}'s profile`}
                width={56}
                height={56}
                className="rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <User className="w-7 h-7 text-primary" />
              </div>
            )}
            
            {/* Admin Badge */}
            {user.isAdmin && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1 shadow-lg">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground text-lg truncate">
                {user.username}
              </h4>
              {user.isAdmin && (
                <span className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full font-medium flex-shrink-0">
                  Admin
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-foreground/60">
              <div className="flex items-center gap-1 min-w-0">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default PostUser;
