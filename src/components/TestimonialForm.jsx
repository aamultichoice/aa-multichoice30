import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Star, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { base44 } from "@/api/base44Client";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    client_name: "",
    company: "",
    testimonial_text: "",
    service_used: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await base44.entities.Testimonial.create({
        ...formData,
        is_approved: false
      });
      
      setSubmitStatus({
        type: "success",
        message: "Thank you for your testimonial! We'll review it and publish it shortly."
      });
      
      // Reset form
      setFormData({
        client_name: "",
        company: "",
        testimonial_text: "",
        service_used: "",
        rating: 5
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="border-blue-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Experience</CardTitle>
        <CardDescription>
          Your feedback helps us improve and helps others make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="client_name">Your Name *</Label>
            <Input
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_used">Service You Used *</Label>
            <select
              id="service_used"
              name="service_used"
              value={formData.service_used}
              onChange={handleChange}
              required
              className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a service</option>
              <option value="Notary Services">Notary Services</option>
              <option value="Logistics Solutions">Logistics Solutions</option>
              <option value="Procurement Services">Procurement Services</option>
              <option value="Business Consultation">Business Consultation</option>
              <option value="Document Drafting">Document Drafting</option>
              <option value="Multiple Services">Multiple Services</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial_text">Your Testimonial *</Label>
            <Textarea
              id="testimonial_text"
              name="testimonial_text"
              value={formData.testimonial_text}
              onChange={handleChange}
              placeholder="Tell us about your experience with our services..."
              required
              rows={5}
              className="resize-none"
            />
          </div>

          {submitStatus && (
            <Alert className={submitStatus.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
              <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Testimonial
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your testimonial will be reviewed before being published on our website.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}