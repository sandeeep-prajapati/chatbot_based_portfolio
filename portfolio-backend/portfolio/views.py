import random
import json
import torch
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .mymodel import NeuralNet
from .nltk_utils import bag_of_words, tokenize
import os

# Load model and data
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
intents_path = os.path.join(BASE_DIR, 'intents.json')
data_path = os.path.join(BASE_DIR, 'data.pth')

with open(intents_path, 'r') as json_data:
    intents = json.load(json_data)

data = torch.load(data_path)
input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return "I do not understand..."

@csrf_exempt
def chat(request):
    if request.method == 'GET':
        message = request.GET.get('message', '')
        print(message)
        if not message:
            return JsonResponse({'response': 'No message provided'}, status=400)

        response_message = get_response(message)
        return JsonResponse({'response': response_message})

    return JsonResponse({'error': 'Invalid request method'}, status=405)
