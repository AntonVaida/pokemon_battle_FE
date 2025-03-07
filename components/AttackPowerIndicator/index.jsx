import { motion } from "framer-motion"


export const AttackPowerIndicator = ({showIndicator, attackPowerValueRef}) => {
  if (!showIndicator) {
    return null
  }

  return (
    <div>
      <div className="w-full lg:flex justify-center items-center mb-[32px] hidden">
        <h3 className="font-helvetica text-[12px] text-gray font-bold">ATTACK POWER</h3>
      </div>
      <div className="lg:w-[120px] h-[200px] lg:h-[400px] flex justify-center items-end relative">
        <motion.div
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{
            duration: 1.5,    
            ease: "linear",
            repeat: Infinity,
            delay: 1,
          }}
        onUpdate={(latest) => {
          attackPowerValueRef.current = latest.height;
        }}
          className="w-[12px] lg:w-[30px] rounded-lg overflow-hidden relative"
        >
          <div className="w-[12px] lg:w-[30px] h-[200px] lg:h-[400px] rounded-lg bg-gradient-to-b from-[#F2488E] to-[#C293C8] absolute bottom-0 left-0"></div>
        </motion.div>
      </div>
    </div>
  )
}