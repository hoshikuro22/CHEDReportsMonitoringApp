export default function DashboardAdminTable() {
  return (
    <div className="container mx-auto flex-row">
      <div className="grid grid-cols-4 gap-6 mt-4 mb-5">
        <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300  transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600 flex flex-row ">
                Daily Report Records | <p className="text-white">_ </p>
                <p className="right">
                  Date:{" "}
                  {new Date()
                    .toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")}
                </p>
              </p>

              <p className="text-2xl font-bold text-indigo-800 mb-1 flex gap-4 mt-2">
                <span className="text-4xl leading-loose text-indigo-500"></span>{" "}
                {"#" + ` Record/s for Today`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300 hover:border-indigo-600 transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600">AAAA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300 hover:border-indigo-600 transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600">Details ; Pending Reports (to pass)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300 hover:border-indigo-600 transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600">|||others||| </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
