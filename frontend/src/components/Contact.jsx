function Contact() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <form className="max-w-md mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border rounded"
        />
        <textarea
          placeholder="Your Message"
          className="p-3 border rounded"
        ></textarea>

        <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </section>
  )
}

export default Contact