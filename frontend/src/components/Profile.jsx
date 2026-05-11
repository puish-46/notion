function Profile({ user }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
        
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name|| "User"}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl mx-auto mb-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name */}
        <h2 className="text-xl font-bold">
          {user?.name}
        </h2>

        {/* Role */}
        <p className="text-gray-500">
          {user?.role || "Member"}
        </p>

        {/* Email */}
        <p className="text-gray-400 text-sm mt-2">
          {user?.email || "No email"}
        </p>

        {/* Button */}
        <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;