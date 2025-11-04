import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-gradient-to-br from-white to-blue-50/30 border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="mb-4">
            <Quote className="w-10 h-10 text-yellow-500 opacity-50" />
          </div>
          
          <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
            "{testimonial.testimonial_text}"
          </p>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="font-bold text-gray-900 text-lg">
              {testimonial.client_name}
            </p>
            {testimonial.company && (
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            )}
            <p className="text-xs text-blue-600 font-semibold mt-2">
              {testimonial.service_used}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}