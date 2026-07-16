# Notes

## Session 2

### Algorithm - definition

- Systematic procedure that produces - in a finite number of steps - the answer to a question or the solution of a problem
- is a step by step procedure to solve a problem or accomplish some end
* For computers, it has to be extreamly specific, avoiding space for interpretation

### Rules-based Art

Algorithmic - follos rules, focus on the process rather than the final output
* Follows rules, you specify what you want it to do

Generative - the final output depends on the process, this can mean (pseudo-random) fators or sone form of input data
* you don't fully control de output

Both often intersect, and generative is often based in interpretations of nature

### COMPUTERS CONECTED TO MANUAL CRAFTS

- ex. The Jacquard Machine


### SHADERS IN CG (COMPUTER GRAPHICS) 

-> VISUAL EFFECTS AND CGI, HEVILY USED IN COMPUTER EFFECTS

* Perlin Noise -> Originated from the effects used in Tron (1982)


### Functions

For custom functions, using 'return', you can indicate what you what the function to do

'translate' allows you to move your objects arround

'push' and 'pop' = isolate translations, but you always have to close the function


## Session 3

### Data

- Anything can be data in a general. context
- Data vs information: context is the key
- Data often does not have context

### Data and Computers

- for computers to be able to understand data, we need to be able to translate them to numbers
- We can use anithing as data in coding as long as we express it in numbers
- for example, images are made of pixels, pixels are made up of 3 values (R,G,B) 

### Sound as Data

Sound data is expressed as the position of the speaker membrane, in a list of numbers, typically between -1 and 1


### JSON

JavaScript Object Notation

JSON is a PLAIN TEXT FORMAT for storing and transporting data, used to send, receive and store data.

Example

("name": "John", "age": 30, "car": null)


## Session 4

### Interactions and interfaces

What is an interface?

Ethimology: between faces -> a wide way to communicate between actors and machine, actos and actors or machines and machines.

Medium - is the specific mode of comunication

Interface - how we comunicate (API's where an interface)

ex. text, keyboard, voice

#### Interfaces in computing

- Physical interfaces: moved, touched, clicked on
- Digital interfaces
- Voice interfaces
- Graphic interfaces: usually digital
- Phygital (physical-digital) interfaces
- Text interfaces
- Movement interfaces

#### Interfaces on the web

- Text forms
- Buttons
- Sliders
- Radio buttons
- Tick Boxes
- Drop down lists
- AI-supported (speech, video, images, etc)

Interfaces creative technologists usually work with

- Graphic User Interface (GUI)
- Text interface, ex. Command Line Interface (CLI)
- Keyboard + Mouse


## Session 5

### Introducction to Machine Learning

#### What is Artificial Intelligence? And how would you define it?

- Technology that enables computers and machines to simulate human learning, comprehension, problem solving, decision making, creativity and autonomy. (IBM)
- capability of computational systems to perform tasks typically associated with human intelligence (wikipedia)
- a tecnology that allows you to simulate human inteligence (geeks for geeks)

Basiclly is using technology to simulate a type of intelligence or ways of thinking


#### How it diffirienciates from Machine Learning?

AI: technology that enables computers and machines to simulate humang learning, comprehension, problem solving, decision making, creativity and autonomy.

Machine Learning: a subset of artificial intelligence where algorithms analyze large datasets to identify patterns and make predictions without being explicitly programmed. Instead of following hard-coded rules, the system "learns" from examples to generalize and make informed decisions on new, unseen data.


#### IN A NUTSHELL

AI: perceived simulation of human(?) behavior

ML: learning from data


#### Some Challenges of the Up-to-Date AI Developments

#### Challenge 1

- Centering (which?) humans as the reference point
- As ML models learn from data, they only "know” the data in the training dataset, and datasets are biased, thus the bias is transferred into the models

#### Challenge 2

- Centering (only) humans as the reference point
- Humans function differently to other organisms. Other organisms are better suited for their
way of living and can do things humans cannot. Why only compare computers to humans?

#### Challenge 3

- A false parallel between acomputer system and (more-than-) human cognition
- Congition is distributed and situated, while knowledge is contextual. Knowledge and cognition differ between individuals, communities, species, and more

#### Challenge 4

- The environmental and social cost of AI
- Use of energy and water to train and run ML models, the current boom for new AI and Data Centres, increasing CO2 emissions in the face of the climate emergency. Power in the hands of few big tech companies, and privacy concerns over unethical use of data and AI companies supporting government surveillance



#### Problem Solving with Machine Learning

- Thinking Machines
- Autonomous Beings (agents)
- Adoptable products/services

#### Problem Solving? with Machine Learning

### Mission #1: Classification

- Step 1: Feed the clean data
- Step 2: Express data into something dynamic
- Step 3: Find the boundary that (almost) separates data
- Step 4: If couldn't, revise the status multiple times...
- Step 5: ...and slowly adjusting the boundary…

* #### Data cleansing is important! (‘GIGO’)
* #### Feature extraction (e.g. A dog's face has two eyes and big one nose) => Especially for * computer vision
* #### Similar with putting things into the different boxes, but the ‘model’ will find the best representation to call those boxes.
* #### For evaluation

### Mission #2: Regression
 
* #### Find the simplest representation of the trend of data that’s fed on the ‘model’
* #### When data gets complicated, it maps data to the ‘higher dimension’ to find the statistical correlation between variable X and variable Y
* #### Works on continuous data that stored along with time
* #### e.g. Finance/investment estimation, …

### Mission #3: Generative AI
* #### Under the spotlight nowadays (especially LLM models)
* #### Massive amount of data is fed -> bring that trained model to complex use-cases
* #### Most of the AI-based industry ‘products’ are based on these
* #### e.g. Google’s Nano Banana, Claude Opus/Sonnet/models, OpenAI’s GPT-x models


## Session 6

### Interactive Machine Learning

#### Computer Vision

Perception: the quality of being aware of things through the physical senses, especially sight (Cambridge Dictionary) 

But perception is not only about the eyes. 

Is *being aware* of something. Having ones own opinion/analysis on something. We define the answer of 'What is it?' from its shape, past expirience with it, its physical characteristics, etc.

Computer Vision Task:

- Step 0: Organizing
    - Prepare the dataset, so the program can access it easily. It can be a table, array, JSON, CSV...
    - Usually, a computer will access image data from the database following the key from dataset
    - Label everything correctly
    - *KAGGLE: best place to find the open-source dataset*

- Step 1: Preprocessing
    - Cleansing data is really important!
    - This is about making the pixel size the same
    - In Computer Vision, the contrast or adjusting the brightness, etc. is also crucial! Sometimes, modifying the colour space is helpful.

- Step 2. Choose the wise model
    - CNN (Convolutional NN) for general image classification
    - RNN (Recursive NN) for sequential image classification (video frames)

        - Filters: Put some effect on top so that the feature can be easily distinguishable.
        - Stride: The distance between how a filter walks around the image.
        - Padding: Controlling the size of the next layer, and so on…
        - Transforms data onto the feature map. Data is now a ‘feature vector’ that reflects ‘semantic meaning’.
        - Nowadays, Transformer model is popular.
        - Using the self-attention mechanism (‘Attention is all you need’) to detect similarities, correlations, etc.
        - Performing the dot product between each feature vector:
            - The value will be smaller or negative when there’s no correlations. -> Typically replaces CNN.


- Step 3. Train the model with your dataset
    - After it does its tasK it will use ‘loss function’ to calculate whether the made decision is different, and if it is, how much and it will step backwards (called ‘backpropagation’) to trace its path and adjust weights.

- Step 4. Do the task
    - Image classification
    - Pose estimation
    - Face recognition
    - Object tracking
    - Image segmentation
    - Object detection

- Step 5. Combine with other data
    - Again, perception is created more than just from eyes.
    - Overreliance on cameras (videos) can cause accident.
    - LiDAR scanners are great (but £££)

#### Data and AI Ethics


## Session 7

### Image generation with Machine Learning
Generative AI refers to a category of models that can generate new content based on the patterns it has learned from existing data.

Moving beyond traditional AI tasks like recognition, to creation of data such as text, images, music and videos.

It typically relies on neural networks, especially deep learning models,

Unsupervised learning