import nltk
import re
import numpy as np
from sentence_transformers import SentenceTransformer
from bertopic import BERTopic

# Ensure that you have the necessary NLTK resources
nltk.download('punkt')

def parse_markdown(md_text):
    blocks = []  # This will store the final blocks of content
    stack = []  # Stack to keep track of the current level
    
    # Split the markdown text into lines
    lines = md_text.splitlines()
    
    for line in lines:
        heading_match = re.match(r'^(#{1,6})\s*(.*)', line)  # Matches markdown headings
        if heading_match:
            # Heading found, determine the level and content
            new_level = len(heading_match.group(1))  # Number of '#' determines the level
            heading_text = heading_match.group(2)
            
            # Add the heading to the stack
            while stack and stack[-1]['level'] >= new_level:
                # Pop from stack until we find a block of lesser level
                blocks.append(stack.pop())
                
            # Push the new heading block onto the stack
            current_block = {
                'level': new_level,
                'heading': heading_text,
                'content': []
            }
            stack.append(current_block)
        
        elif line.strip():  # Non-empty lines that are not headings
            # Determine indentation level
            indent_level = len(line) - len(line.lstrip())
            
            # Handle bullet points or numbered list items
            list_item_match = re.match(r'^\s*(\*|-|\+|\d+\.)\s*(.*)', line)
            if list_item_match:
                # Strip the list marker (bullet point or number)
                list_item_content = list_item_match.group(2).strip()
                if stack:
                    stack[-1]['content'].append({
                        'content': list_item_content,
                        'indent_level': indent_level
                    })  # Add as list content
            elif indent_level > 0:  # Indented content (non-list items)
                # Treat as subcontent to the last heading in the stack
                if stack:
                    stack[-1]['content'].append({
                        'content': line.strip(),
                        'indent_level': indent_level
                    })
            else:
                # Non-indented content is part of the last heading block
                if stack:
                    stack[-1]['content'].append({
                        'content': line.strip(),
                        'indent_level': indent_level
                    })
    
    # Append any remaining blocks in the stack
    while stack:
        blocks.append(stack.pop())
    
    return blocks

def get_block_texts(blocks):
    # Extract block content as strings (heading + content) with proper markdown structure
    block_texts = []
    for block in blocks:
        block_text = block['heading'] + "\n"
        for item in block['content']:
            # Indent the content based on the indent level
            indent = ' ' * (item['indent_level'] * 2)  # 2 spaces per indentation level
            block_text += f"{indent}- {item['content']}\n"
        block_texts.append(block_text)  # Append as a structured markdown block
    return block_texts

def read_markdown_file(file_path):
    """Reads a markdown file and returns its content as a string."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def process_files(file_paths):
    """Process multiple markdown files, tokenize and vectorize them."""
    all_block_texts = []
    for file_path in file_paths:
        markdown_text = read_markdown_file(file_path)
        blocks = parse_markdown(markdown_text)
        block_texts = get_block_texts(blocks)
        all_block_texts.extend(block_texts)
    
    return all_block_texts

def fit_bertopic_on_blocks(block_texts):
    """Fit BERTopic to the tokenized blocks and return topics."""
    sentence_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')  # Use pre-trained model for sentence embeddings
    embeddings = sentence_model.encode(block_texts, convert_to_tensor=True)
    embeddings = embeddings.cpu().numpy()  # Convert to NumPy array
    
    topic_model = BERTopic(min_topic_size=2)  # Set min_topic_size to 2 to avoid small clusters
    topics, probs = topic_model.fit_transform(block_texts, embeddings=embeddings)
    
    return topic_model, topics, probs

def combine_topics_and_generate_markdown(file_paths):
    """Combine topics and generate a combined markdown file."""
    # Step 1: Process files and tokenize
    block_texts = process_files(file_paths)
    
    # Step 2: Fit BERTopic on the tokenized blocks
    topic_model, topics, probs = fit_bertopic_on_blocks(block_texts)
    
    # Step 3: Combine topics from both files
    combined_markdown = ""
    for topic_idx in set(topics):  # Loop over all unique topics
        combined_markdown += f"# Topic {topic_idx}\n"
        
        # Get the block content for the current topic
        topic_content = [block_texts[i] for i in range(len(block_texts)) if topics[i] == topic_idx]
        
        # Append the content for the current topic
        combined_markdown += "\n".join(topic_content) + "\n\n"
    
    return combined_markdown

# Example usage:
file_paths = ['./based_samples/Lecture 2.md', './based_samples/Lecture 2 Andrew Chen.md']  # Replace with your markdown file paths

# Generate combined markdown content based on matching topics
combined_markdown = combine_topics_and_generate_markdown(file_paths)

# Optionally, write the combined markdown content to a new file
with open('combined_output.md', 'w', encoding='utf-8') as f:
    f.write(combined_markdown)

print("Combined markdown file has been generated!")
