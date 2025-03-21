import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Page() {
  const reviews = [
    {
      name: "Aulia Rahman",
      rating: 5,
      comment: "Mentornya sangat membantu dan penjelasannya mudah dipahami."
    },
    {
      name: "Dewi Santoso",
      rating: 4.5,
      comment: "Sesi mentoringnya insightful, tapi durasinya agak kurang panjang."
    },
    {
      name: "Fahmi Akbar",
      rating: 4,
      comment: "Materinya bagus, tapi ada beberapa bagian yang kurang detail."
    }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Review Mentor</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700">Notifikasi</button>
            <button className="text-gray-700">Profil</button>
          </div>
        </header>
        
        {/* Review List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex items-center text-yellow-500 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(review.rating) ? "#facc15" : "none"} stroke="#facc15" />
                  ))}
                  <span className="ml-2 text-gray-600">{review.rating}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
