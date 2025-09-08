from flask import Flask, render_template, send_from_directory, url_for, request, jsonify
import os
from flask_mail import Mail, Message

app = Flask(__name__)

# Configure Flask-Mail with your Gmail credentials
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "aeronsalipsip@gmail.com"  # Replace with your email
app.config["MAIL_PASSWORD"] = "bddo eqff povd xwsd"    # Replace with your App Password
app.config["MAIL_DEFAULT_SENDER"] = "aeronsalipsip@gmail.com"

mail = Mail(app)

VISITOR_COUNT_FILE = "visitor_count.txt"
DOWNLOAD_COUNT_FILE = "download_count.txt"
CV_DIRECTORY = "static/docs"  
CV_FILENAME = "My-Portfolio.docx" 

# Function to get visitor count
def get_visitor_count():
    try:
        with open(VISITOR_COUNT_FILE, "r") as file:
            return int(file.read().strip())
    except FileNotFoundError:
        return 0

# Function to update visitor count
def update_visitor_count():
    count = get_visitor_count() + 1
    with open(VISITOR_COUNT_FILE, "w") as file:
        file.write(str(count))
    return count

# Function to get download count
def get_download_count():
    try:
        with open(DOWNLOAD_COUNT_FILE, "r") as file:
            return int(file.read().strip())
    except FileNotFoundError:
        return 0

# Function to update download count
def update_download_count():
    count = get_download_count() + 1
    with open(DOWNLOAD_COUNT_FILE, "w") as file:
        file.write(str(count))
    return count

@app.route('/')
def home():
    visitor_count = update_visitor_count()
    download_count = get_download_count()
    return render_template('index.html', visitor_count=visitor_count, download_count=download_count)

@app.route("/send_email", methods=["POST"])
def send_email():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    subject = data["subject"]
    message_body = data["message"]

    # Create email message
    msg = Message(subject=f"New Inquiry: {subject}", recipients=["aeronsalipsip@gmail.com"])
    msg.body = f"From: {name} ({email})\n\n{message_body}"

    try:
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/download_cv')
def download_cv():
    update_download_count()
    return send_from_directory(CV_DIRECTORY, CV_FILENAME, as_attachment=True)

if __name__ == '__main__':
    app.run()