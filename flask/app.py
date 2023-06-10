from flask import Flask, request, jsonify
import model as m

app = Flask(__name__)

@app.route("/")
def index():
    return "API is running!"


@app.route("/calculate", methods=["POST"])
def calculate_scores():
    data = request.json
    try:
        anxiety_questions = [data['q1'], data['q4'], data['q7'], data['q10'], data['q13'], data['q16'], data['q19']]
        depression_questions = [data['q2'], data['q5'], data['q8'], data['q11'], data['q14'], data['q17'], data['q20']]
        stress_questions = [data['q3'], data['q6'], data['q9'], data['q12'], data['q15'], data['q18'], data['q21']]

        scores = {
            'anxiety': calculate_score(anxiety_questions),
            'depression': calculate_score(depression_questions),
            'stress': calculate_score(stress_questions)
        }

        return jsonify(scores)
    except KeyError:
        return jsonify(error="Invalid input")


def calculate_score(questions):
    try:
        scores = [float(ans) for ans in questions]
        score = sum(scores) * 2
        return score
    except ValueError:
        return "Bad Input"


@app.route("/predict", methods=["POST"])
def predict_conditions():
    data = request.json
    try:
        inputs = [float(data['x1']), float(data['x2']), float(data['x3']), float(data['x4']), float(data['x5']),
                  float(data['x6']), float(data['x7'])]
        
        anxiety_score = float(data['anxiety_score'])
        depression_score = float(data['depression_score'])
        stress_score = float(data['stress_score'])

        anxiety_prediction = m.anxiety_pred(*inputs, anxiety_score)
        stress_prediction = m.stress_pred(*inputs, stress_score)
        depression_prediction = m.depression_pred(*inputs, depression_score)

        predictions = {
            'anxiety_prediction': anxiety_prediction,
            'stress_prediction': stress_prediction,
            'depression_prediction': depression_prediction
        }

        return jsonify(predictions)
    except KeyError:
        return jsonify(error="Invalid input")


if __name__ == "__main__":  
    app.run(debug=True, host="127.0.0.1", port=8000)
