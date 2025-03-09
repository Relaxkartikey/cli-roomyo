'use client';

import { trackEvent, trackClick, trackFormSubmit } from '@/lib/analytics';

// Example component showing how to use analytics
export default function AnalyticsExample() {
  // Example of tracking a button click
  const handleButtonClick = () => {
    trackClick('button', 'example_button', {
      location: 'example_component',
      value: 'example_value'
    });
    
    // Continue with your button click logic
    console.log('Button clicked');
  };
  
  // Example of tracking a form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    trackFormSubmit('example_form', {
      form_type: 'contact',
      source: 'example_page'
    });
    
    // Continue with your form submission logic
    console.log('Form submitted');
  };
  
  // Example of tracking a custom event
  const handleCustomAction = () => {
    trackEvent('user_action', {
      action_type: 'custom_action',
      item_id: 'example_id',
      item_name: 'Example Item'
    });
    
    // Continue with your action logic
    console.log('Custom action performed');
  };
  
  return (
    <div className="p-4 border rounded-lg my-4">
      <h3 className="text-lg font-medium mb-4">Analytics Examples</h3>
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
        onClick={handleButtonClick}
      >
        Track Button Click
      </button>
      
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
        onClick={handleCustomAction}
      >
        Track Custom Action
      </button>
      
      <form onSubmit={handleFormSubmit} className="mt-4">
        <input 
          type="text" 
          placeholder="Example input" 
          className="border p-2 rounded-md w-full mb-2"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Submit Form (Track Form Submit)
        </button>
      </form>
    </div>
  );
} 