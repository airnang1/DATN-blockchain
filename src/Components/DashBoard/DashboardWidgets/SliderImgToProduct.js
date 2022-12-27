import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function SliderImgToProduct(props) {
  const { image_field, handleRemoveImage, handleSetImageField } = props;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const item = Array.from(image_field.image);
    const [reorderedItem] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, reorderedItem);
    handleSetImageField({ _id: image_field._id, image: item });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="row"
              style={{ width: "500px", display: "inline-table" }}
            >
              {image_field &&
                image_field.image.map((item, index) => (
                  <Draggable
                    key={item.index}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="image-files col-md-3 col-lg-3"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={item.index}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={item.data}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                          }}
                        />
                        <i
                          className="fad fa-times-square"
                          onClick={() =>
                            handleRemoveImage(item, image_field._id)
                          }
                        ></i>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

SliderImgToProduct.propTypes = {};

export default SliderImgToProduct;
