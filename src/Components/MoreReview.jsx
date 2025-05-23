import { Star } from "lucide-react";
import broccoli1 from "../assets/broccoli1.svg";
import testleaf from "../assets/testleaf.svg";
import tomato2 from "../assets/tomato2.svg";
import p4 from "../assets/p4.svg";
import p5 from "../assets/p5.svg";
import p6 from "../assets/p6.svg";
import p7 from "../assets/p7.svg";

// Temporary Google link
const REVIEWS_PAGE_URL =
  "https://www.google.com/search?sca_esv=06a2c7a83ea8322e&sxsrf=AHTn8zoXQluHXp14yg7JBnbdgdfAFMPY9A:1746861031441&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzWkBEIiaOGtsERWM3ttjqr7g5GrdJpRCNLlLNkb2CQgfS-Ez2UU1A6U2aHqqcKWP30VY2HTuNE-SxThrUV_AoDFKFFRh&q=Radha+Caterers+Reviews&sa=X&ved=2ahUKEwjH3YC6rJiNAxX-dfUHHd96DUcQ0bkNegQITRAD&biw=1536&bih=710&dpr=1.25";

const MoreReview = () => {
  const reviews = [
    {
      id: 1,
      name: "jenish shihora",
      avatar: p5,
      rating: 5,
      count: 18,
      text: "Radha Caterers truly made our event unforgettable! From start to finish, their service was exceptional and the food was absolutely divine. Every dish was crafted with such authentic flavors and presented beautifully — it felt like a feast straight from the heart.The team was incredibly professional, attentive, and accommodating to all our needs. They went above and beyond to ensure everything was perfect, and it showed in every little detail. Our guests couldn’t stop raving about the delicious menu and warm hospitality.Thank you, Radha Caterers, for bringing so much joy and flavor to our celebration! Highly, highly recommend to anyone looking for outstanding catering with a personal touch.",
    },
    {
      id: 2,
      name: "Jigar Dholiya",
      avatar: p4,
      rating: 5,
      count: 70,
      text: "I recently had the pleasure of using Radha Caterers for my brother's wedding, and I can't recommend them highly enough! The food quality was exceptional, and every guest raved about the delicious flavors.The highlight for me was the halwa on the second day—it was absolutely mouthwatering! The soup was outstanding as well, and every dish reflected the best in taste and quality.Another standout feature was their commitment to hygiene, which was greatly appreciated by everyone. The service at the table was top-notch, ensuring a wonderful dining experience for all.If you're looking for catering that guarantees great food and impeccable service, Radha Caterers is the way ..",
    },
    {
      id: 3,
      name: "Manisha Umed Vadsariya",
      avatar: p7,
      rating: 5,
      count: 70,
      text: "Radha Caterers Surat exceeded all our expectations! The food was delicious, services were top-notch, management was efficient, and the staff were extremely polite. Highly recommend for any event or occasion.",
    },
    {
      id: 4,
      name: "Ronak Gangadiya",
      avatar: p6,
      rating: 5,
      count: 28,
      text: "Radha Caterers made our wedding unforgettable! 🌟 Their food was delicious, well-presented, and full of rich flavors. The staff was professional, ensuring seamless service with great hospitality. Everything was managed efficiently, from setup to serving. Highly recommend them for any event! ⭐⭐⭐⭐⭐",
    },
    {
      id: 5,
      name: "Umed Mansurbhai Vadsariya",
      avatar: p7,
      rating: 5,
      count: 51,
      text: "Radha Caterers has garnered exceptional reviews for its outstanding service, management, and food quality. Customers frequently highlight the delicious vegetarian dishes, prompt responses, and polite staff. Many recommend them for events like birthdays and weddings, praising their ability to cater to large gatherings with efficiency and professionalism. The overall experience is often described as delightful, making Radha Caterers a top choice for catering needs in Surat",
    },
    {
      id: 6,
      name: "Mehul Bhalala",
      avatar: p5,
      rating: 5,
      count: 28,
      text: "We hired Radha Cateres for our family event, and it was an amazing experience! The food was absolutely delicious—every dish was fresh, flavorful, and beautifully presented. The soup, biryani and desserts were a big hit among our guests. The service was top-notch, with friendly and professional staff ensuring everything was well-organized. Highly recommend them for any event!.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Image with Gradient Overlay */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="/elegant-dining-celebration.png"
          alt="Customer dining experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white"></div>
      </div>

      {/* Title */}
      <div className="text-center my-8 md:my-12">
        <h2 className="text-3xl md:text-4xl font-medium">Customer Reviews</h2>
      </div>

      {/* Reviews Grid */}
      <div className="relative px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Decorative Fork Left */}
        <div className="absolute -left-20 top-1/4 -translate-x-1/2 hidden md:block">
          <img
            src={broccoli1}
            alt="Decorative fork"
            width={150}
            height={200}
            className="opacity-40"
          />
        </div>

        {/* Decorative Wine Glass Right */}
        <div className="absolute -right-25 top-1 translate-x-1/2 hidden md:block">
          <img
            src={testleaf}
            alt="Decorative wine glass"
            width={250}
            height={300}
            className="opacity-40"
          />
        </div>

        {/* Decorative Fork Bottom Right */}
        <div className="absolute -right-25 bottom-0 translate-x-1/3 hidden md:block">
          <img
            src={tomato2}
            alt="Decorative utensils"
            width={200}
            height={200}
            className="opacity-40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-[#0079BF]/50 [border-top-left-radius:50px] [border-top-right-radius:20px] [border-bottom-left-radius:20px] [border-bottom-right-radius:50px] p-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={`${review.name}'s profile`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-amber-400" : "text-gray-300"
                      }
                    >
                      <Star className="w-4 h-4s fill-current" />
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 font-bold mb-4">
                  {review.name}
                </span>
                <p className="text-gray-600 text-justify line-clamp-5">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Reviews Button */}
        <div className="flex justify-center mt-10 mb-16 gap-5">
          <a href={REVIEWS_PAGE_URL}>
            <button className="bg-[#0079BF] hover:bg-[#0079BF]/80 text-white font-medium py-3 px-8 [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] transition-colors">
              More Reviews
            </button>
          </a>
          <a href={REVIEWS_PAGE_URL}>
            <button className="bg-[#0079BF] hover:bg-[#0079BF]/80 text-white font-medium py-3 px-8 [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] transition-colors">
              Leave a Review
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreReview;
