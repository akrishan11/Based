import nltk
import pandas as pd
nltk.download('punkt')
nltk.download('punkt_tab')
from bertopic import BERTopic
import hdbscan
from nltk.tokenize import sent_tokenize
from bertopic.representation import KeyBERTInspired
from sklearn.feature_extraction.text import CountVectorizer

file_path = 'test.txt'


def split_file_into_sentences(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    

    sentences = sent_tokenize(text)
    return sentences

sentences = split_file_into_sentences(file_path)

#for sentence in sentences:
#    print(sentence)

def analyze_with_bertopic(sentences):
    # Initialize BERTopic
    representation_model = KeyBERTInspired()
    hdbscan_model = hdbscan.HDBSCAN(min_cluster_size=5, min_samples=1, prediction_data=True)
    vectorizer = CountVectorizer(stop_words="english", ngram_range=(1, 2), min_df=5)
    topic_model = BERTopic(hdbscan_model=hdbscan_model, representation_model=representation_model)
    

    # Fit the model to the sentences

    topics, probabilities = topic_model.fit_transform(sentences)
    topic_model.reduce_topics(sentences,nr_topics=25);

    df = pd.DataFrame({"Document": sentences, "Topic": topics})
    topic_labels = {topic_id: words[0][0] for topic_id, words in topic_model.get_topics().items()}
    df["Topic Label"] = df["Topic"].map(topic_labels)
    grouped = df.groupby("Topic Label")["Document"].apply(list)


    # Get the topics and associated sentences

    # Combine topics with the sentences for easy interpretation

    return grouped

topics_df = analyze_with_bertopic(sentences)

def save_topics_to_markdown(df, filename="topics.md"):
    with open(filename, "w", encoding="utf-8") as f:
        for topic, sentences in df.items():
            f.write(f"## {topic}\n")  # Markdown heading for topic name
            for sentence in sentences:
                f.write(f"- {sentence}\n")  # Unordered list item
            f.write("\n")  # Add a blank line for spacing between topics

save_topics_to_markdown(topics_df)


# topic_labels = {topic_id: words[0][0] for topic_id, words in topic_model.get_topics().items()}
# print(topic_labels)
# print("Topic Information:")
# print(topic_info)
# print("\nSentences Categorized by Topics:")
# print(sentence_topics.to_string())




