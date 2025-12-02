import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <div className=" px-4 md:px-[108px] py-[100px] flex flex-col gap-10 max-w-[1440px] ">
        <h1 className="text-3xl underline decoration-4 underline-offset-4 decoration-[#11AD30]">
          About Us
        </h1>

        <h2 className=" text-3xl  md:text-6xl font-medium">
          We&apos;re passionate about empowering Jamaican businesses with modern
          payment solutions, making digital transactions accessible and secure
          for everyone.
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          <div className=" md:w-1/4">
            <p className="text-xl ">
              We&apos;re proud to be powering commerce in Jamaica.
            </p>
          </div>

          <div className="md:w-3/4">
            <p className="text-base ">
              Welcome to HandyPay, Jamaica&apos;s leading mobile payment platform.
              Born from a desire to modernize payments in Jamaica, HandyPay makes
              it easy for businesses and individuals to accept digital payments
              with QR codes and payment links. Whether you&apos;re a small business
              owner, freelancer, or entrepreneur, HandyPay provides the tools you
              need to get paid quickly and securely. We bridge the gap between
              traditional payment methods and modern digital solutions, ensuring
              everyone in Jamaica can participate in the digital economy.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-[108px] py-[100px] flex flex-col md:flex-row gap-10 max-w-[1440px] ">
        <div className="w-full md:w-1/2">
          <Image
            src="/AboutUs.svg"
            width={300}
            alt="HandyPay mobile payment platform"
            height={500}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <h3 className="text-3xl font-medium">Together we can</h3>

          <h4 className="text-2xl font-semibold">
            Empower Jamaican businesses digitally?
          </h4>

          <p className="text-xl text-[#475467] font-normal">
            At HandyPay, we believe that every payment processed strengthens Jamaica&apos;s
            economy. By providing accessible digital payment solutions, we&apos;re creating
            opportunities for businesses to grow, customers to pay conveniently, and
            communities to thrive. From accepting card payments at a food stall to
            receiving international transfers, each transaction is an opportunity to
            empower entrepreneurs and modernize commerce. Together, we can help
            businesses embrace digital payments while giving customers reliable
            payment options they can trust. It&apos;s more than just processing
            payments—it&apos;s about building financial inclusion, driving economic
            growth, and creating a network of digital commerce. Let&apos;s shape a
            brighter, more connected Jamaican economy—one payment at a time.
          </p>
        </div>
      </div>

      <div className="bg-[#0C1D17] px-4 md:px-[108px] py-[100px] flex flex-col gap-8 max-w-[1440px] ">
        <h3 className="text-white text-xl font-normal">Our Mission</h3>

        <h3 className="text-white text-3xl font-medium">
          To empower Jamaican businesses and individuals to accept digital payments
          with ease and confidence. By providing simple, secure payment tools, we
          aim to make financial transactions accessible for everyone in Jamaica.
        </h3>

        <p className="text-xl text-[#CDFD4F] ">
          We&apos;re dedicated to creating a payment platform that supports local
          businesses, fosters trust, and enhances Jamaica&apos;s digital economy
          by making payments fast, secure, and universally accessible.
        </p>
      </div>

      <div className="px-4 md:px-[108px] py-[100px] flex flex-col gap-8 max-w-[1440px] ">
        <h3 className="text-xl font-normal">Our Vision</h3>

        <h3 className="text-3xl font-medium">
          To be Jamaica&apos;s most trusted and widely used payment platform,
          connecting businesses with customers through seamless digital transactions
          that work anywhere, anytime.
        </h3>

        <p className="text-xl text-[#11AD30]">
          We&apos;re committed to innovation, security, and accessibility, ensuring
          that every Jamaican can participate in the modern digital economy.
        </p>
      </div>

      <div className="px-4 md:px-[108px] py-[100px] flex flex-col gap-20 max-w-[1440px] ">
        <div className="md:max-w-[50%] flex flex-col gap-4">
          <h3 className="text-4xl font-medium">Our commitment to you</h3>

          <p className="text-[#121926] text-xl">
            Your security and trust are paramount to us at HandyPay. We prioritize
            your financial safety and data protection with every transaction.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h3 className="font-medium text-2xl">Fast, secure payments</h3>
            <p className="font-normal text-[#454745]">
              Bank-grade security with instant processing. Your money is protected
              with industry-leading encryption and fraud prevention.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-2xl">Reliable payouts</h3>
            <p className="font-normal text-[#454745]">
              With HandyPay, you can count on fast, reliable payouts to your
              Jamaican bank account or Western Union—no delays, no complications.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-2xl">Multi-currency support</h3>
            <p className="font-normal text-[#454745]">
              Accept payments in both JMD and USD, giving you and your customers
              the flexibility to transact in their preferred currency.
            </p>
          </div>
        </div>
      </div>

      <div className=""></div>
      <div className=""></div>
    </div>
  );
}
