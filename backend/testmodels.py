import joblib
import pickle

# Test loading salary model and scaler
try:
    salary_model = joblib.load("salary_model.pkl")
    scaler = joblib.load("scaler.pkl")
    print("✅ Salary model and scaler loaded successfully!")
    print("Salary model:", type(salary_model))
    print("Scaler:", type(scaler))
except Exception as e:
    print("❌ Error loading salary model or scaler:", e)

# Test loading course recommendation model and encoders
try:
    with open("course_model.pkl", "rb") as f:
        course_model, label_encoders = pickle.load(f)
    print("✅ Course model and label encoders loaded successfully!")
    print("Course model:", type(course_model))
    print("Label Encoders Keys:", list(label_encoders.keys()))
except Exception as e:
    print("❌ Error loading course model or encoders:", e)
