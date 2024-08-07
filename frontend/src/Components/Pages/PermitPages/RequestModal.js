// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const RequestModal = ({ show, handleClose, handleSave }) => {
//   const [formData, setFormData] = useState({
//     description: '',
//     endDate: '',
//     startDate: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSave(formData);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>İzin Talebi</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="startDate">
//             <Form.Label>Başlangıç Zamanı</Form.Label>
//             <Form.Control
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="endDate">
//             <Form.Label>Bitiş Zamanı</Form.Label>
//             <Form.Control
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="description">
//             <Form.Label>Açıklama</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Kaydet
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default RequestModal;
